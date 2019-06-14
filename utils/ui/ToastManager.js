import React from 'react';
import Toast from 'react-native-root-toast';
import { PRIMARY, SUCCESS, WARN, DANGER } from '../../utils/constant';

export default class ToastManager extends React.Component {

  getColor = (type) => {
    switch (type) {
      case PRIMARY: {
        return '#FFD740'
      } 
      
      case SUCCESS: {
        return '#008b00'
      }

      case WARN: {
        return '#ff7043'
      }

      case DANGER: {
        return '#B71C1C'
      }

      default:
        break;
    }
  }
  render() {

    const { visible,type,hideToast,position,message } = this.props.toast

    return (
      <React.Fragment>
              <Toast
                backgroundColor={this.getColor(type)}
                visible={visible}
                position={position}
                shadow={false}
                onHide={hideToast}
                animation={true}
                opacity={1}
                hideOnPress={true}
                textColor={'#000000'}
                containerStyle={{
                  width: '90%',
                  borderRadius: 10
                }}
              >
                {message}
              </Toast>
      </React.Fragment>
      
    )
  }
}

