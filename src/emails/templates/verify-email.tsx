import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Tailwind,
  Text,
} from '@react-email/components'

export interface VerifyEmailProps {
  name: string
  code: string
}

export const VerifyEmail = ({ name, code }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to use the Invoice API</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Verify your email
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hello {name},</Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Thanks for registering with the Invoice API!
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Please provide the code below to the verify-email endpoint to verify your email
              address.
            </Text>

            <Row>
              <Column>
                <Text className="text-[32px] font-bold">{code}</Text>
              </Column>
            </Row>

            <Text className="text-black text-[14px]">
              Kindly note that this code will expire in 12 hours.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default VerifyEmail
