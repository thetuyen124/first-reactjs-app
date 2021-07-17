const Social = (props) => {
  const { alt, src } = props;
  return (
    <a className="a-link" href="#">
      <img className="social" alt={alt} src={src} />
    </a>
  );
};
export default Social;
