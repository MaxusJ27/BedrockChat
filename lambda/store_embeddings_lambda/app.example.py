# python libraries 
import json 
from io import BytesIO
import os
import base64
import shutil
# langchain library 
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_community.embeddings import BedrockEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain_community.vectorstores import FAISS
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.llms.bedrock import Bedrock
# amazon library 
import boto3 
import logging 
logger = logging.getLogger()
logger.setLevel(logging.INFO)


# Function to convert PDF to base64
def convert_pdf_to_base64(file_path):
    with open(file_path, 'rb') as file:
        byte_content = file.read()
    base64_content = base64.b64encode(byte_content)
    return base64_content.decode()

def store_add_texts_with_retry(store, i):
    store.add_texts([i.page_content], metadatas=[i.metadata])

# create a bedrock runtime
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'  # Replace with your desired region
)

# create an s3 client 
s3 = boto3.Session().resource("s3")


# - create the Titan Embeddings Model
bedrock_embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v1",
                                       client=bedrock_runtime)
    

def lambda_handler(event, context):
    event = json.loads(event['body'])
    logger.info(f"Event Body: {event}")

    file = event.get('encodedFile', '')
    folder_name = event.get('fileName', '')
    user_id = event.get('userID', '')
    file_type = event.get('fileType', '')

    byte_content = base64.b64decode(file)
    data_stream = BytesIO(byte_content)
    text_list = []
    if (file_type == 'docx'):
        # Convert .docx to .pdf
        from docx import Document 
        doc = Document(data_stream)
        docx_text = ''.join([paragraph.text for paragraph in doc.paragraphs])
        text_list = [docx_text]
    elif (file_type == 'pdf'):
        # PyPDF2 library 
        import PyPDF2
        pdf_reader = PyPDF2.PdfReader(data_stream)
        pdf_text = str()
        # Extract pdf text
        for page in pdf_reader.pages:
            pdf_text += page.extract_text()
            text_list = [pdf_text]

    document =  []


    metadata_list = [
        {"source": "local"}
    ]

    doc_creator = CharacterTextSplitter()

    document = doc_creator.create_documents(texts = text_list, metadatas = metadata_list)


    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap  = 100,
    )

    docs = text_splitter.split_documents(document)

    store = FAISS.from_documents(
        docs,
        bedrock_embeddings,
    )


    from tqdm import tqdm
    c1=0
    for i in tqdm(
        docs, desc=f"Embedding documents from file {folder_name}", unit="docs", total=len(docs), bar_format="{l_bar}{bar}| Time Left: {remaining}"
    ):
        try:
            store_add_texts_with_retry(store, i)
        except Exception as e:
            print(e)
            print("Error on ", i)
            print("Saving progress")
            print(f"stopped at {c1} out of {len(docs)}")
            store.save_local(f"/tmp/{folder_name}")
            break
        c1 += 1
    store.save_local(f"/tmp/{folder_name}")



    s3_bucket_name = {based on the file you've created'}
    s3_save_folder = folder_name
    with tqdm(
            total=2,
            desc=f"Uploading vectors to '{s3_save_folder}' folder in S3 bucket '{s3_bucket_name}' 🦖",
            unit="doc(s)",
            bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt} {unit} [Time Left: {remaining}]",
        ) as pbar:
            # First File Upload
            s3.Bucket(s3_bucket_name).upload_file(
                f"/tmp/{folder_name}/index.faiss",
                f"{user_id}/{s3_save_folder}" + "/" + "index.faiss",
            )
            pbar.update(1)  # update progress bar after first file

            # Second File Upload
            s3.Bucket(s3_bucket_name).upload_file(
                f"/tmp/{folder_name}/index.pkl",
                f"{user_id}/{s3_save_folder}" + "/" + "index.pkl",
            )
            pbar.update(1)  # Update progress bar after second file

            # Cleanup
            os.remove(f"/tmp/{folder_name}/index.faiss")
            os.remove(f"/tmp/{folder_name}/index.pkl")
            os.removedirs(f"/tmp/{folder_name}")
    
    return {
        "statusCode": 200,
        "body": json.dumps(f"Document has been uploaded to S3 for user: {user_id}")
    }