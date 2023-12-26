
export async function FetchWord(req: string) {
    try{
        const response = await fetch(req)
        const body = await response.json() 
        return body   
    } 
    catch {
        console.log('error')
    }
}

