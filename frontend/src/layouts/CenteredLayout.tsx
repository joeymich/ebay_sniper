

interface Props {
    children: React.ReactNode;
}

export const CenteredLayout: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div
            className='h-screen flex items-center justify-center'
        >
            {props.children}
        </div>
    )
}