import styled from "styled-components";

// break out styled comp into its own
export const Label = styled.label`
  color: #434370; //grayish-blue text color
  font-weight: bold;
`;

export const WarningLabel = styled.label`
  color: red;
  display: block;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: Gainsboro;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

export const Button = styled.button`
  background: white;
  color: darkblue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  border: 2px solid darkblue;
  &:hover {
    font-weight: bold;
  }
`;

export const EditButton = styled(Button)`
  background: lightgray;
  color: maroon;
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.25em 0.7em;
  border: 0px;
  &:hover {
    background: silver;
  }
`;

export const DisplayContainer = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  padding-bottom: 30px;
  width: 30vw;
  height: auto;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  background: lightgray;
`;

export const DisplayPending = styled(DisplayContainer)`
  background: #e5f5ff; //very lightblue color
  // background: LightGoldenrodYellow; 
`;

export const DisplayCrossedOff = styled(DisplayContainer)`
  background: LightGoldenrodYellow; 
`;

export const Section = styled.section`
  // outline: 1px dotted red;  //for visual/alignment testing
`;

export const ItemsInCategory = styled.div`
  width: auto;
  width: 25vw;
  height: auto;
  text-align: center;
  padding: 0.25em 1em;
  padding-top: 10px;
  padding-bottom: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  background: Gainsboro;
`;

export const PendingItem = styled.div`
  width: auto;
  height: auto;
  text-align: center;
  margin-top: 5px;
`;

export const EachItem = styled.span`
  padding: 8px;
  color: maroon;
`;

export const EachItemName = styled(EachItem)`
  font-weight: bold;
`;

export const CrossedOffItem = styled(PendingItem)`
  text-decoration: line-through;
`;

export const CategoryHeader = styled.h3`
  color: #434370;
`;

export const ListHeader = styled(CategoryHeader)`
  font-weight: 900;
  font-size: larger;
`;

export const AppHeader = styled(ListHeader)`
  font-size: 26px;
  margin-bottom: 50px  
`;

export const Subtotal = styled.p`
  margin-bottom: 0px;
  font-style: italic;
  font-weight: bold;
  color: #434370;
`;

