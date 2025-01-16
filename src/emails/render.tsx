import { render } from '@react-email/components'
import VerifyEmail, { type VerifyEmailProps } from './templates/verify-email.js'

export function renderVerifyEmail(props: VerifyEmailProps) {
  return render(<VerifyEmail {...props} />)
}
