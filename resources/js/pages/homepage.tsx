import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import { store } from '@/routes/chat';

export default function homepage() {
const { props } = usePage<{ history: { role: string; text: string }[] }>();
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(store(), {
            onSuccess: () => reset('message'),
        });
    };

    return (
        <>
            <Head title="Chat AI" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
            </div>
            <div className="space-y-4">
                {props.history?.map((msg, idx) => (
                    <div
                        key={idx}
                        className={
                            msg.role === 'user'
                                ? 'rounded-lg bg-blue-100 p-4 dark:bg-blue-900'
                                : 'rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800'
                        }
                    >
                        <p className="text-sm font-bold mb-1">
                            {msg.role === 'user' ? 'Ty:' : 'AI:'}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                ))}
            </div>
                            
                <form onSubmit={submit} className="flex gap-2">
                    <input
                        type="text"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        className="flex-1 rounded-md border border-neutral-300 p-2 dark:bg-neutral-900 dark:border-neutral-700"
                        placeholder="Wpisz wiadomość..."
                        disabled={processing}
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Wysyłanie...' : 'Wyślij'}
                    </button>
                </form>
        </>
    );
}
