import PrintViews from '@/app/components/print/view'

async function page({ searchParams }: any) {
    return <PrintViews page={searchParams.page} /> 
}

export default page