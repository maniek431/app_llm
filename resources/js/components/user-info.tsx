
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,

}: {
    user: User;
    showEmail?: boolean;
}) {

    return (
        <>

            <div className="grid flex-1 text-left text-sm leading-tight">

            </div>
        </>
    );
}
