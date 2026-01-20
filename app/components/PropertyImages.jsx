import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section
      className="p-4"
      style={{ backgroundColor: "#eff6ff" }}
    >
      <div className="container">
        {images.length === 1 ? (
          <div className="text-center">
            <Image
              src={images[0]}
              alt=""
              width={1800}
              height={400}
              priority
              style={{
                height: "400px",
                width: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </div>
        ) : (
          <div className="row g-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={
                  images.length === 3 && index === 2
                    ? "col-12"
                    : "col-6"
                }
              >
                <Image
                  src={image}
                  alt=""
                  width={1800}
                  height={400}
                  priority
                  style={{
                    height: "400px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
