import Button from "../components/ui/Button";

const HomePage = () => {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="space-y-1">
        <div className="flex w-fit mx-auto my-10 gap-x-2">
          <Button>Post new todo</Button>
          <Button>Generate todo</Button>
        </div>
        <h3>No Todos Yet</h3>
      </div>
    </section>
  );
};

export default HomePage;
