/**
 * react-native-radio-form
 * radio component for react native, it works on iOS and Android
 * https://github.com/cuiyueshuai/react-native-radio-form.git
 */
 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 import {
   View,
   Text,
   ScrollView,
   TouchableWithoutFeedback,
   Dimensions
 } from 'react-native';
 
 const WINDOW_WIDTH = Dimensions.get('window').width;
 
 class RadioForm extends Component {
   constructor(props) {
     super(props);
     this._onPress = this._onPress.bind(this);
     this.renderRadioCircle = this.renderRadioCircle.bind(this);
     this.renderRadioItem = this.renderRadioItem.bind(this);
     this.state = {
       is_active_index:null,
       slectRadio:false
     };
   }
 
   static propTypes = {
     dataSource: PropTypes.array,
     initial: PropTypes.any,
     formHorizontal: PropTypes.bool,
     labelHorizontal: PropTypes.bool,
     itemShowKey: PropTypes.string,
     itemRealKey: PropTypes.string,
     circleSize: PropTypes.number,
     outerColor: PropTypes.string,
     innerColor: PropTypes.string,
     onPress: PropTypes.func,
     fontSize: PropTypes.number,
     alarm: PropTypes.bool,
     isActived: PropTypes.bool
   };
 
   static defaultProps = {
     dataSource: [],
     initial: '',
     formHorizontal: false,
     labelHorizontal: true,
     itemShowKey: 'label',
     itemRealKey: 'value',
     circleSize: 20,
     outerColor: '#E4E4E4',
     innerColor: '#06B050',
     fontSize:16,
     alarm: false,
     isActived: false
   };
 
   componentDidMount() {
     const { itemShowKey, itemRealKey, initial, dataSource } = this.props;
     console.log('initialinitialinitialinitial',initial);
     if (typeof (initial) === 'number') return;
     dataSource.map((item, i) => { 
       if(item.active){
         this.setState({
           is_active_index:i
         })
         return i;
       }else{
        if ((item[itemShowKey] === initial)) {
          this.setState({ is_active_index: i });
          return i;
        }
       }
     });
   }
 
   _onPress(item, index) {
     this.setState({
       slectRadio:true,
       is_active_index: index,
     });
     const {alarm,onChangeData}=this.props;
     if(alarm&&onChangeData){
      this.props.onChangeData(item, index);
     }else{
      if (this.props.onPress) {
        this.props.onPress(item, index);
      }
     }
   }
 
   renderRadioItem(item, i) {
     const { itemShowKey, fontSize, alarm , isActived,itemRealKey} = this.props;
     let isSelected = false;
     const { slectRadio } = this.state;
     if (!alarm) {
       if (this.state.is_active_index === i && slectRadio && !item.active) {
         isSelected = true;
       }
       if (this.state.is_active_index === i && !slectRadio && item.active) {
         isSelected = true;
       }
     } else {
       if (this.state.is_active_index === i) {
         isSelected = true;
       }
     }

     return (
       <TouchableWithoutFeedback
       disabled={!isActived}
         key={i}
         onPress={() => this._onPress(item, i)}
       >
         <View
           style={{ padding: 3.5, flexDirection: this.props.labelHorizontal ? 'row' : 'column',
           justifyContent: 'center', alignItems: 'center' }}
         >
           {this.renderRadioCircle(isSelected,isActived)}
           <View
             style={{ marginLeft: 3 }}
           >
             <Text style={{fontSize:fontSize, color:'#1D1D1D'}}>{'' + item[itemRealKey]}</Text>
           </View>
         </View>
       </TouchableWithoutFeedback>
     );
   }
   getBackgroundColorOne = (isSelected, isActived) => {
     if (!isActived && isSelected) {
       return 'gray'
     }
   }

   getBackgroundColorTwo = (isSelected) => {
     if (isSelected) {
       return this.props.innerColor
     }
     return 'transparent'
   }

   renderRadioCircle(isSelected,isActived) {
     const outerSize = this.props.circleSize > 11 ? this.props.circleSize : 11;
     const innerSize = this.props.circleSize - 7;
     return (
       <View
         style={{ width: outerSize, height: outerSize, margin: 5, justifyContent: 'center', alignItems: 'center',
          borderRadius: outerSize / 2, borderWidth: 2, borderColor: this.props.outerColor }}
       >
         <View
           style={{ width: innerSize, height: innerSize, borderRadius:  innerSize / 2, borderWidth:1, borderColor:'white',
            backgroundColor:!isActived?this.getBackgroundColorOne(isSelected,isActived):this.getBackgroundColorTwo(isSelected)}}
         />
       </View>
     );
   }
 
   render() {
     return (
       <ScrollView
         {...this.props}
         contentContainerStyle={{
           alignItems: 'flex-start',
           flexDirection: this.props.formHorizontal ? 'row' : 'column',
           flexWrap: 'wrap',
           padding: 5
         }}
         style={[{ width: WINDOW_WIDTH }, this.props.style]}
       >
         {
           this.props.dataSource.map((item, i) => this.renderRadioItem(item, i))
         }
       </ScrollView>
     );
   }
 }
 
 export default RadioForm;
 
