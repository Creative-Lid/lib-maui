import React, { ReactNode } from 'react';
import ScrollToTop from '../src/components/ScrollToTop';

interface CustomMDXTemplateProps {
    children: ReactNode;
}

const CustomMDXTemplate: React.FC<CustomMDXTemplateProps> = ({ children }) => (
    <div>
        <ScrollToTop />
        Hello from CustomMDXTemplate
        {children}
    </div>
);

export default CustomMDXTemplate;
