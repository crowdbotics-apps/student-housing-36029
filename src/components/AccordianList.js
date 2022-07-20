import React, {  useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';

const AccordionView = ({
    sections,
    renderSectionTitle,
    renderHeader,
    renderContent
}) => {

  const [activeSections, setActiveSections] = useState([]);

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections)
  };

    return (
      <Accordion
        sections={sections}
        activeSections={activeSections}
        renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={_updateSections}
      />
    );
}

export default AccordionView