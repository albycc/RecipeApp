import { Image } from "react-native"

interface IProps {
    src: string;
    width?: number;
    height?: number;
}

function Icon({ src, width, height }: IProps) {
    return <Image source={require(`../../assets/chicken.png`)} style={{ width: width ?? "100%", height: height ?? "100%" }} />

}



export default Icon