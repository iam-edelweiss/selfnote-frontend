import PropTypes from 'prop-types'
import { PuffLoader } from 'react-spinners'

const overlayStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255 255 255 / 75%)',
    zIndex: 2,
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
}

const LoadingOverlay = ({ children, content, toggle }) => {
  return (
    <div style={{width: "100%"}}>
        {
            toggle ?             
                <div className="overlay" style={overlayStyles}>
                    { content ?? <PuffLoader color='#00b96b' size={120}  loading={true} /> }
                </div>
            :   ''
        }
        { children }
    </div>
  )
}

LoadingOverlay.propTypes = {
    children: PropTypes.element,
    content: PropTypes.any,
    toggle: PropTypes.bool
}

export default LoadingOverlay
