import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";

interface FormInterface {
  personal_access_token: string;
  organization: string;
  repository: string;
  label: string;
  max_page?: number;
}

const MAX_PAGE = 100;

const Home = () => {
  const GithubForm = useForm<FormInterface>({
    defaultValues: {
      personal_access_token: "",
      organization: "",
      repository: "",
      label: "",
      max_page: MAX_PAGE,
    },
  });

  const GithubMutation = useMutation({
    mutationFn: (event: FormInterface) => {
      return 
    }
  })
  return (
    <div className="container mx-auto">
      <div className="text-center h-screen">
        <div>
          <h1 className="pt-5 text-3xl">Github Pull Request Tool</h1>
        </div>
        <div className="pt-5">
          <form>
            <div className="pt-3">
              <label htmlFor="personal_access_token">
                Personal Access Token
              </label>
              <div>
                <input
                  type="text"
                  name="personal_access_token"
                  id="personal_access_token"
                />
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="organization">Organization</label>
              <div>
                <input type="text" name="organization" id="organization" />
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="repository">Repository</label>
              <div>
                <input type="text" name="repository" id="repository" />
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="label">Label</label>
              <div>
                <input type="text" name="label" id="label" />
              </div>
            </div>
            <div className="pt-3">
              <label htmlFor="max_page">Max Page</label>
              <div>
                <input type="number" name="max_page" id="max_page" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
