import React from 'react';
import { Document, Page, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';

// import '../fonts/laofont.css'; // Import the CSS file


interface ReportProps {
    title: string
}



Font.register({
    family: "Notosan",
    src: "https://fonts.gstatic.com/s/notosanslao/v30/bx6QNx2Ol_ixgdYWLm9BwxM3NW6BOkuf763Clj73Cg46D6ELWw.woff2"
    // src: "https://fonts.gstatic.com/s/notosanslao/v30/bx6QNx2Ol_ixgdYWLm9BwxM3NW6BOkuf763Clj73Cg46D6ELWw.woff2"
})

// Font.register({
//     family: "Notosan",
//     // src: "https://fonts.gstatic.com/s/notosanslao/v30/bx6QNx2Ol_ixgdYWLm9BwxM3NW6BOkuf763Clj73Cg46D6ELWw.woff2"
//     src: '../fonts/laofont.css'
// })


const Quixote: React.FC<ReportProps> = ({ title }) => (
    <Document>
        <Page style={styles.body} size={'A4'}>
            <Text style={styles.header} fixed>
                Lao People's Democratic Republic{'\n'}
                Peace Independence Democracy Unity Prosperity{'\n'}
                ດຫັດາ່ຫັກຫັກືັຫກືຫັາກັຫືກສຫັາກືັສຫາກືສຫັາກືສຫັາກືາຫສກາືຫັກາສາສ
            </Text>
            <Text style={styles.title}>Report</Text>
            <Text style={styles.author}>The user utilizes the website's functionalities through their account</Text>
            {/* <Image style={styles.image} src={"./Images/job-searching.png"} /> */}
            <Text style={styles.subtitle}>
                Title: {title}
            </Text>
            <Text style={styles.text}>
                En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
                mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
                antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
                carnero, salpicón las más noches, duelos y quebrantos los sábados,
                lentejas los viernes, algún palomino de añadidura los domingos,
                consumían las tres partes de su hacienda. El resto della concluían sayo
                de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
                mismo, los días de entre semana se honraba con su vellori de lo más
                fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
                que no llegaba a los veinte, y un mozo de campo y plaza, que así
                ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
                hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
                enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
                tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
                diferencia en los autores que deste caso escriben), aunque por
                conjeturas verosímiles se deja entender que se llama Quijana; pero esto
                importa poco a nuestro cuento; basta que en la narración dél no se salga
                un punto de la verdad
            </Text>

        </Page>
    </Document>
);



const styles = StyleSheet.create({
    body: {

        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 14,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontFamily: "Notosan",
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'red',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export default Quixote;
