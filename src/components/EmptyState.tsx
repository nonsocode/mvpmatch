import styled from '@emotion/styled'
import Heading from './Heading'

const StyledEmptyState = styled.div({
  height: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
})

const Box = styled.div({
  width: 470,
})

const TitleWrapper = styled.div({
  marginBottom: 10,
})
const ImageWrapper = styled.div({
  marginTop: 50,
  img: {
    display: 'block',
    width: '100%'
  },
})
type EmptyStateProps = {
  title: string
  subtitle: string
  image: string
}
export const EmptyState = ({ title, subtitle, image }: EmptyStateProps) => {
  return (
    <StyledEmptyState>
      <Box>
        <TitleWrapper>
          <Heading size="h3">{title}</Heading>
        </TitleWrapper>
        <Heading size="h5" muted>
          {subtitle}
        </Heading>
        <ImageWrapper>
          <img src={image} alt={title} />
        </ImageWrapper>
      </Box>
    </StyledEmptyState>
  )
}
