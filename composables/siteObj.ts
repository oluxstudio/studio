export const useSiteObj = () => {

    const siteTreeObj = useState('siteTreeObj',()=>{})

    const formatSiteTreeObj  = async (id: any): Promise<any>=>{
        const {apiData,loadApiData}= useSiteData()
        loadApiData(id)
        siteTreeObj.value={
            id:apiData.value?.id,
            name:apiData.value?.name,
            domain:apiData.value?.domain,
            pages:[]
        }
        apiData.value?.pages.forEach((item,index)=>{
            const page = usePageObj(item)
            siteTreeObj.value.pages.push(page)
            // console.log(page);            
        })        
    }

    return {
        siteTreeObj,
        formatSiteTreeObj
    }
}