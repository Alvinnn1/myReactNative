import { Image } from 'react-native';

export function SupplierLogo(props) {
  console.log(props)
  return <Image source={require(props.path)} style={{height:px2dp(160),flex:1,marginRight:px2dp(5)}}></Image>
}
