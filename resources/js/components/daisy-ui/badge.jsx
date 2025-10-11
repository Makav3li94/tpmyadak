
export default function Badge(props) {
    const { type,outline } = props

    const types = {
        neutral: 'badge-primary',
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        accent: 'badge-accent',
        info: 'badge-info',
        error: 'badge-error',
        success: 'badge-success',
        warning: 'badge-warning',

        //
        only: '',
    }

    return (
        <div
            className={`badge ${outline ? 'badge-outline' : ''} ${!type ? types.default : types[type]} ${
                props.className ? props.className : ''
            }`}
        >{ props.children}
        </div>

    )
}
