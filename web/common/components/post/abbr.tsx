
const Abbr = ({ value, children }: any) => {
    return (
        <abbr title={value.text}>{children}</abbr>
    );
};

export default Abbr;