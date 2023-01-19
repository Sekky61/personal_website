
const Abbr = ({ value, children }: any) => {
    console.log(value);

    return (
        <abbr title={value.text}>{children}</abbr>
    );
};

export default Abbr;