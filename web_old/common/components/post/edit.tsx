const Edit = ({ value }: any) => {
  return (
    <span className="font-semibold px-1">
      <span>
        <span className="underline">Edit</span>:{" "}
      </span>
      {value.text}
    </span>
  );
};

export default Edit;
