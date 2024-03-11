
import Breadcrumb from "@/app/ui/files/breadcrumb";
import Form from "@/app/ui/files/create-form";


const Page =() => {


    return (
        <main className='p-6'>
            <Breadcrumb
            breadcrumbs={[
                { label: "Files", path: "/dashboard/files" },
                { label: "Create File", path: "/dashboard/files/create", active: true }
            ]} />
            <Form />

        </main>
    )

}

export default Page;