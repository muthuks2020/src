import React from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Field, formValueSelector } from 'redux-form';
import { RenderSelect, RenterInputText } from '../../../ui/Fields';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    fontSize: 13,
    color: "#424242"
  },
  tableValue: {
    flex: 0.5,
    marginRight:5,
    color: "#424242"
  },
  tableValueBig: {
    flex: 1,
    marginRight:5,
    color: "#424242",
  },
  input: {
    width: 50,
    textAlign: "right"
  },
  select: {
    flex:1.5,
    marginTop: Platform.OS === 'android'? -2: 0,
    marginLeft: Platform.OS === 'android'? 32: 0, 
  }
});

let Inputs = (props) => {
  const { index, page, input, groups, reasons, inputQuantity } = props;
  return (
    <View
      key={`${input}_{index}`}
      style={{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingTop: 0,
        alignItems: 'center',
        paddingBottom: page === 0 ? 0 : 15
      }}>

      <Text style={[styles.tableValueBig, { textAlign: 'left',fontFamily:'Rubik' }]}>{groups[index].PlanningGroupName}</Text>
      <Field number={true} name={`${input}.Quantity`} component={RenterInputText} style={[styles.tableValue, { textAlign: "right"}]} />
      {/* select field */}
      {(page === 0 &&
        <View style={{ flex: 1, marginRight: 0, flex: 1, textAlign: 'right' }}>
          <Field name={`${input}.ReasonCodeId`} component={RenderSelect} items={reasons} style={[ styles.select, {width:'100%', alignItems: 'flex-end', bottom: 10 }]} disabled={ inputQuantity == 0? true: false }/>
        </View>)
      }

    </View>
  )
};

Inputs = connect((state, ownProps) => {
  const selector = formValueSelector(ownProps.formName);
  return {
    inputQuantity: selector(state, `${ownProps.input}.Quantity`)
  }
})(Inputs);

class RenderInputs extends React.Component {

  render() {
    const { fields, ...rest } = this.props;
    return (
      fields.map((input, index) => {
        return (
          <Inputs key={`${fields.name}_index`} input={input} index={index} fields={fields} {...rest} />
        )
      })
    )
  }
};

export default RenderInputs;