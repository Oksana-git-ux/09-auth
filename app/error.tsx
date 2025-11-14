

'use client';

type Props = {
    error: Error;
};

const Error = ({ error }: Props) => {
    return (
        <div>
            <p>Some went wrong. {error.message}</p>
        </div>
    );
}

export default Error;
