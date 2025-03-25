export const useSiteData = () => {
    const apiData = useState<Site|null>('siteData',()=>null)
    const loadApiData  = async (id: any): Promise<any>=>{
        try {                
            const { data } = await useAsyncGql({
                operation: 'Site',
                variables: { id }
            });
            apiData.value = data.value.site
        }
        catch (error) {
            console.log(error);            
        }
    }

    return {
        apiData,
        loadApiData
    }
}

type Site = {
    id:string
    name:String
    domain:String
    pages:Page[]
    // media:Media
    // created_at:String
}
type Media = {
    created_at: Date
    extension: String
    file_name: String
    id: String
    mime_type: String
    size: Number
    updated_at: Date
    upload_name: String
}

interface Page {
    id: number;
    name: string;
    description: string;
    created_at: string;
    attributes: string;
    entities: any[];
}
interface Page2 {
    id: number;
    name: string;
    description: string;
    created_at: string;
    attributes: string;
    entities: Entity2
}
interface Entity {
    id:String;
    name:String;
    nodes:[Node];
    description: string,
    attributes: string,
    created_at: string,
}
interface Entity2 {
    [name:string]:{
        nodes:{
            [label:string]:any
        };
    }
}
type Node = {
    id:String;
    label:String;
    value:String;
    type:String;
    listType:String;
    parent_id:String;
    cid:String;
}


const formatPage = (page:Page)=>{    
    const nd:any = {
        "id":page.id,
        "name":page.name,
        "attributes":page.attributes,
        "created_at":page.created_at,
        "description":page.description,
        "entities":{},
    }
    
    page.entities.forEach((elm:any) => {        
        nd.entities[kebabCase(elm.name)] = <Entity2>{
            "id": elm.id,
            "name": elm.name,
            "description": elm.description,
            "attributes": elm.attributes,
            "created_at": elm.created_at,
            "nodes": unflatten(apiData)
            // "nodes": unflatten(elm.nodes)
        }
    });
    return nd
}

const kebabCase = (string:any) => string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('_')
    .toLowerCase();

function unflatten(arr:any) {    
    let map:any = {}, node, res:any = {}, i:number;
    
    for (i = 0; i < arr.length; i += 1) {
        map[arr[i].id] = i;
        if (arr[i].parent_id === "0") {
            arr[i].attr = {};
            
        }
        if (arr[i].type === 'list') {
            const pi = arr.findIndex((item:any)=>item.id ===arr[i].parent_id)
            arr[pi].list = [];
            arr.forEach((item:any,index:number) => {
                if (arr[i].id === item.parent_id) {
                    arr[index].parent_id=arr[pi].id
                    arr[index].listType = "item";
                }
                
            });     
            arr.splice(i,1)
        }
    };
   
    arr.forEach((node:any,index:number) => {        
        if (node.parent_id !== "0") {
            if (node.listType === "item") {
                arr[map[node.parent_id]].list.push(node);
            } 
            else if(arr[map[node.parent_id]].attr){
                arr[map[node.parent_id]].attr[node.label]=node
            }
        } 
        else {
            res[node.label]=node;
        };
    });
    /*
    for (i = 0; i < arr.length; i += 1) {
        node = arr[i];
      
        if (node.parent_id !== "0") {
            if (node.listType === "item") {
                // console.log(arr[map[node.parent_id]].list);
                arr[map[node.parent_id]].list.push(node);
            } 
            else if(arr[map[node.parent_id]].attr){
                arr[map[node.parent_id]].attr[node.label]=node
            }
        } 
        else {
            res[node.label]=node;
        };
   };
   */
   return res;
}

const apiData=[
    {
        "id": "1",
        "label": "email",
        "value": "",
        "type": "text",
        "parent_id": "0"
    },
    {
        "id": "2",
        "label": "id",
        "value": "email",
        "type": "text",
        "parent_id": "1"
    },
    {
        "id": "3",
        "label": "name",
        "value": "",
        "type": "text",
        "parent_id": "0"
    },
    {
        "id": "4",
        "label": "subject",
        "value": "",
        "type": "text",
        "parent_id": "0"
    },
    {
        "id": "5",
        "label": "message",
        "value": "",
        "type": "text",
        "parent_id": "0"
    },
    {
        "id": "6",
        "label": "",
        "value": "",
        "type": "list",
        "parent_id": "4"
    },
    {
        "id": "7",
        "label": "opt1",
        "value": "opt1",
        "type": "text",
        "parent_id": "6"
    },
    {
        "id": "8",
        "label": "type",
        "value": "text",
        "type": "text",
        "parent_id": "1"
    },
    {
        "id": "9",
        "label": "opt2",
        "value": "opt2",
        "type": "text",
        "parent_id": "6"
    },
    {
        "id": "10",
        "label": "opt3",
        "value": "opt3",
        "type": "text",
        "parent_id": "6"
    },
    {
        "id": "11",
        "label": "title",
        "value": "Get In Touch Form",
        "type": "text",
        "parent_id": "0"
    }
]