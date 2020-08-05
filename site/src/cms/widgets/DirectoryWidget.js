 import { List } from 'immutable';
 import NetlifyCmsRelationWidget from "netlify-cms-widget-relation"

 export default class DirectoryWidget extends NetlifyCmsRelationWidget.controlComponent {
     /*
      We override the NetlifyCmsRelationWidget.controlComponent parseHitOptions with our modified version.
      The mapping of the hits themselves is the same as in the parent.
     */
     parseHitOptions = hits => {
         const {field} = this.props;
         const valueField = field.get('valueField');
         const displayField = field.get('displayFields') || field.get('valueField');

         return hits.map(hit => {
             let labelReturn;
             if (List.isList(displayField)) {
                 labelReturn = displayField
                     .toJS()
                     .map(key => this.parseNestedFields(hit.data, key))
                     .join(' ');
             } else {
                 labelReturn = this.parseNestedFields(hit.data, displayField);
             }

             // to generate the directory path we need to cycle through the parents.
             let nextHit = hit;
             while (nextHit.data.directory && nextHit.data.directory !== "Root") {
                 let parentDirectory = nextHit.data.directory;
                 labelReturn = parentDirectory + " → " + labelReturn;
                 let parentHit = hits.find((potentialHit) => potentialHit.data.title === parentDirectory);
                 if (parentHit) {
                     nextHit = parentHit;
                 } else {
                     break;
                 }
             }

             return {
                 data: hit.data,
                 value: this.parseNestedFields(hit.data, valueField),
                 label: labelReturn,
             };
         });
     };
 }