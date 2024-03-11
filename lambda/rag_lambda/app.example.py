# python3 
import os 
import json
# amazon library 
import boto3 
import logging 
logger = logging.getLogger()
logger.setLevel(logging.INFO)
# langchain
from langchain_community.vectorstores import FAISS
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain_community.embeddings import BedrockEmbeddings
from langchain.llms.bedrock import Bedrock
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# create a bedrock runtime
bedrock_runtime = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1'  # Replace with your desired region
)

# create an s3 client 
s3 = boto3.client('s3')


# - create the Titan Embeddings Model
titan_embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v1",
                                       client=bedrock_runtime)

def lambda_handler(event, context):
    event = json.loads(event['body'])
    """ event should contain the following keys:
    faiss_path: 
    pkl_path:
    prompt:
    model:

    """
    faiss_key = event.get('faissKey', '')
    pkl_key = event.get('pklKey', '')
    prompt = event.get('message', '')
    model = event.get('model', '')
    logger.info(f"Event Body: {event}")

    # load the large language model 
    llm = Bedrock(model_id=model, client=bedrock_runtime)

    # download the faiss index and pkl file from s3
    bucket = {based on the S3 bucket you've created'}
    faiss_path = os.path.join('/tmp', 'index.faiss')
    pkl_path = os.path.join('/tmp', 'index.pkl')
    
    s3.download_file(bucket, faiss_key, faiss_path)
    s3.download_file(bucket, pkl_key, pkl_path)
    

    # load the faiss index and pkl file
    vectorstore_faiss = FAISS.load_local('/tmp', titan_embeddings,allow_dangerous_deserialization=True)
    # wrapper_store_faiss = VectorStoreIndexWrapper(vectorstore=vectorstore_faiss)
    prompt_template = """

    Human: Use the following pieces of context to provide a concise answer to the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
    <context>
    {context}
    </context

    Question: {question}

    Assistant:"""
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore_faiss.as_retriever(
            search_type="similarity", search_kwargs={"k": 3}
        ),
        return_source_documents=True,
        chain_type_kwargs={"prompt": PROMPT},
    )

    result = qa({"query": prompt })
    logger.info(f"Result: {result}")
    # Cleanup
    os.remove(f"/tmp/index.faiss")
    os.remove(f"/tmp/index.pkl")
    return {
        'statusCode': 200,
        # cannot serialize an already serialized object
        # 'body': json.dumps(result)
        'body': json.dumps(result['result'])
    }

