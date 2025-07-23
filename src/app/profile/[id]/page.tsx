export default function UserProfile({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">

            <h1>profile</h1>
            <hr />
            <p className="text-4xl">profile page <span className="text-black bg-purple-400 rounded p-1">{params.id}</span></p>

        </div>
    )
}