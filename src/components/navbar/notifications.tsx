import { BellRing } from "lucide-react"


interface NotificationProps{
    user:any
}

export const Notification = ({user}:NotificationProps) => {

    return (
        <div>
            <BellRing />
        </div>
    )
}