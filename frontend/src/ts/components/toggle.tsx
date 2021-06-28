type ToggleProps = {
  checked?: boolean
  children?: React.ReactNode
  id?: string
  label?: string
  name?: string
  onChange?: () => void
}

const Toggle = ({
  checked,
  children,
  id,
  label,
  name,
  onChange,
}: ToggleProps): JSX.Element => (
  <div>
    <label htmlFor={id}>
      <input
        checked={checked}
        id={id}
        name={name}
        onChange={onChange}
        type="checkbox"
      />
      {label || children}
    </label>
  </div>
)

Toggle.defaultProps = {
  checked: false,
  children: null,
  id: 'toggle',
  label: '',
  name: '',
  onChange: () => null,
}

export default Toggle
