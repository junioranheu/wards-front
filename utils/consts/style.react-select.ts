const styleReactSelect = {
    control: (base: any) => ({
        ...base,
        fontSize: '0.9rem',
        fontWeight: 'normal',
        borderRadius: '0.5rem',
        padding: '6px 5px',
        border: 'var(--border) !important',
        boxShadow: 'none',
        '&:focus': {
            border: '0 !important',
        }
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--principal)' : 'transparent',
        '&:hover': {
            backgroundColor: state.isSelected ? 'var(--principal-escuro)' : 'rgb(222, 235, 255)'
        }
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: 'rgb(222, 235, 255)',
        borderRadius: '0.25rem',
        padding: '3px 2.5px',
        color: 'var(--preto)'
    })
}

export default styleReactSelect;