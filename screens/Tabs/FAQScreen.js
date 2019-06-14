
import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
import i18n from "../../utils/i18n";

import { Page, Navbar, NavbarItem } from '../../utils/AppTor';
/** This is the screen for showing T0 T1 and T2 */
export default class FAQScreen extends Component {
    

    render() {
        const source = {uri:'https://s3.us-east-2.amazonaws.com/gpastaticfiles/faq.pdf',cache:true};
        return (
            <Page>
            <Navbar>
                    <NavbarItem showText={true} backLink={'Back'} backText={i18n.t("Back")} firstTab={true}/>
                    <NavbarItem title={i18n.t("FAQ")} />
                    <NavbarItem />
                    </Navbar>

            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={styles.pdf}/>
          </Page>
            )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
    pdf: {
      flex:1,
      width:Dimensions.get('window').width,
  }
  });
  
