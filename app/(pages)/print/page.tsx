import PrintViews from '@/app/components/print/view'

async function page({ searchParams }: any) {
    return <PrintViews page={searchParams.page} type={searchParams.type} from={searchParams.from} to={searchParams.to} />
}

export default page