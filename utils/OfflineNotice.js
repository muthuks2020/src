import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import ToastManager from '../utils/ui/ToastManager';


const { width } = Dimensions.get('window');

function MiniOfflineSign(visible) {
  alert(visible)
  return (
    <ToastManager toast={{
      visible: visible,
      position: -160,
      message: 'You are currently offline, But you can keep working..',
      duration: 7000,
      type: 'WARN'

  }} />
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    // if (!this.state.isConnected) {
    //   return <MiniOfflineSign />;
    // }
    // return null;
    return  <ToastManager toast={{
      visible: !this.state.isConnected,
      position: -160,
      message: 'You are currently offline, But you can keep working..',
      duration: 7000,
      type: 'WARN'

  }} />
  }
}



const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;