import { Helmet } from 'react-helmet-async';

const MetaTags = ({ title, children = '' }) => {
  return (
    <Helmet>
      {/* <title>{`${title} | SelfNote`}</title> */}
      <title>{ title ? `${title} | ` : ''} SelfNote</title>
      {children}
    </Helmet>
  )
}

export default MetaTags
