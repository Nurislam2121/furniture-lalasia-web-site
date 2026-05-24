export default function InputField({ label, type, id, name, value, onChange }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} className="auth-input" />
    </div>
  )
}