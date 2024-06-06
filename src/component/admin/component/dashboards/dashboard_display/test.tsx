import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Font, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Register the font with @react-pdf/renderer
Font.register({
    family: 'Noto Sans Lao',
    src: 'https://fonts.gstatic.com/s/notosanslao/v13/H4chBXKMl9HagUWymywzxNFyr6VoJ6HCp1h_Iiw.ttf'
});

const TestReport: React.FC = () => {
    const [title, setTitle] = useState('');
    const componentRef = useRef<HTMLDivElement>(null);
    const [showPDF, setShowPDF] = useState(false);

    const handlePrint = () => {
        setShowPDF(true);
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            fontFamily: 'Noto Sans Lao',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>This is a printable component!</Text>
                    <Text>ັຫກຫັກັຫກຫັ</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="grid grid-cols-2">
            <div ref={componentRef} className='bg-white'>
                <h1 className="text-4xl font-bold text-center mb-2">Report</h1>
            
                
                <p className='font-notoLao'> ຫັກັຫກັຫກ</p>
            </div>
            <div className="p-8 bg-slate-700">
                <div className="p-8 space-y-4 bg-base-100 h-fit bg-opacity-100 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center mb-2">Report</h1>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-36 w-full outline outline-1 outline-primary"
                        placeholder="Body"
                    />
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="text" className="grow" placeholder="Conclusion" />
                        <span className="badge badge-info">end</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 outline outline-1 outline-primary">
                        <input type="file" className="grow" placeholder="Chart Image" />
                        <kbd className="kbd kbd-sm">⌘</kbd>
                    </label>
                    <div className="flex justify-center pt-12">
                        <ReactToPrint
                            trigger={() => <button className="btn btn-primary btn-wide">Print this out!</button>}
                            content={() => componentRef.current}
                        />
                        <button className="btn btn-primary btn-wide ml-4" onClick={handlePrint}>Preview PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestReport;
