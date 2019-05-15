import service from "../service/firebase";
import "../components/app.tag";

const setQueries = (queries) => {
  const url = window.location;
  const currentQueries = new URLSearchParams(url.search);

  for (let key in queries) {
    let value = queries[key];
    if (value === 1) currentQueries.delete(key)
    else if (value) currentQueries.set(key, value)
    else currentQueries.delete(key);
  }

  window.history.replaceState(
    "",
    "",
    `${url.origin}${url.pathname}?${currentQueries.toString()}`
  );
}

const getProducts = async (that, page) => {
  that.opts.loading = 'loading';
  that.update();
  
  const { currentCategory, currentEmotion } = that.opts;
  const queries = {
    category: currentCategory,
    emotion: currentEmotion
  };

  setQueries({
    page: page,
    ...queries
  });

  if (currentCategory === "All Products") {
    delete queries.category;
  }

  if (currentEmotion === "All Emotions") {
    delete queries.emotion;
  }

  const { data, total } = await service.paginate(
    queries,
    page,
    that.opts.perPage
  );

  that.opts.products = data;
  that.opts.total = total;
  that.opts.currentPage = page;
  that.opts.drowDownOpen = false;
  that.opts.totalPage = Math.ceil(total / that.opts.perPage) > 0 ? Math.ceil(total / that.opts.perPage) : 1;
  that.opts.loading = '';
  that.update();
}

const appController = (riot, root ,navbar) => () => {
  navbar[0].opts.view = "homepage";
  navbar[0].update();

  root.innerHTML = "<app></app>";
  const query = new URLSearchParams(window.location.search);

  const currentCategory = query.get("category") || 'All Products';
  const currentEmotion = query.get("emotion") || 'All Emotions';

  const app = riot.mount("app", {
    currentCategory: currentCategory,
    currentEmotion: currentEmotion,
    drowDownOpen: false,
    perPage: query.get('perPage') || 9,
    categories: ["All Products", "Accessories", "Boys Stuff", "Bridal", "Girls Stuff", "Jewelry", "Weird Stuff", "Random Stuff"],
    emotions: ["All Emotions", "Heartbroken", "Shocked", "Angry", "On The Bound", "Better Than Ever"],
  });

  const that = app[0];

  that.opts.toggleDrowDown = () => {
    that.opts.drowDownOpen = !that.opts.drowDownOpen;
    that.update();
  }
  
  const page = query.get('page') > 0 ? Number(query.get('page')) : 1;
  getProducts(that, page);

  that.opts.goToPage = (newPage) => {
    that.opts.currentPage = newPage;
    getProducts(that, newPage);
  };

  that.opts.setFilter = (filter, value) => {
    that.opts[`current${filter}`] = value;
    getProducts(that, 1);
  };
}

export default appController;