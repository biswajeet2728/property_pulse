import { authOption } from "./authOption";
import { getServerSession } from "next-auth/next";


export const get_server_session = async () => {

    const session = await getServerSession(authOption);

    if(!session || !session.user){
        return null
    }
    return {
        user : session.user.name,
        email : session.user.email,
        userId : session.user.id,
    }
}