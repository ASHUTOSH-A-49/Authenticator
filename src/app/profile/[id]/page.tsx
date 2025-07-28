export default async function UserProfile({params}:any){
    const param = await params  //we need to await params before using its id and its better to use const id = params.id instead of directly destructuring it 
    const id = param.id
    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">

            <h1>profile</h1>
            <hr />
            <p className="text-4xl">profile page <span className="text-black bg-purple-400 rounded p-1">{id}</span></p>

        </div>
        
    )
}