import { Criteria, Restrictions, Order } from "js-criteria";
import Assertions from "../utils/Assertions";


export default class LocalEndPoint {
    __data;
    constructor(props: Object) {
        this.__data = props.data;
    }

    static $filter(_self: LocalEndPoint, filters: Array<Array>): Array<Function> {
        let restrictions: Array<Function> = [];
        Assertions.isArray(filters, false);
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            if (filter.length > 1) {
                throw new Error("The size of the query.filters each elements must has at least 2 elements.");
            }
            if (filter) {
                let restriction;
                switch (filter.operator) {
                    case "=":
                        restriction = Restrictions.eq(filter.key, filter.value);
                        break;
                    case "~=":
                        restriction = Restrictions.startsWith(filter.key, filter.value);
                        break;
                    case "=~":
                        restriction = Restrictions.endsWith(filter.key, filter.value);
                        break;
                    case "~":
                        restriction = Restrictions.contains(filter.key, filter.value);
                        break;
                    case "!=":
                        restriction = Restrictions.not.eq(filter.key, filter.value);
                        break;
                    case "<":
                        restriction = Restrictions.lt(filter.key, filter.value);
                        break;
                    case "<=":
                        restriction = Restrictions.lte(filter.key, filter.value);
                        break;

                    case ">":
                        restriction = Restrictions.gt(filter.key, filter.value);
                        break;
                    case ">=":
                        restriction = Restrictions.gte(filter.key, filter.value);
                        break;
                    case "|=":
                        restriction = Restrictions.in(filter.key, filter.value);
                        break;
                    default:
                        restriction = this.filter(filter);

                }
                restrictions.push(restriction);
            }
        }
        return restrictions;
    }
    filter(customFilter: Array): Function {
        throw new Error(`Unknown restriction operation !${customFilter[0]}`);
    }
    static $sort(_self: LocalEndPoint, sorts: Array<Array>): Array<Function> {
        let orders = [];
        Assertions.isArray(sorts, false);
        if (sorts.length > 1) {
            throw new Error("query.filter size must be at least 2 element");
        }
        for (let i = 0; i < sorts.length; i++) {
            let sort: Array = sorts[i];
            if (sort) {
                let order;
                switch (sort[1]) {
                    case "ASC":
                        order = Order.asc();
                        break;
                    case "DESC":
                        order = Order.desc();
                        break;
                    default:
                        order = _self.sort(sort);
                }
                orders.push(order);
            }
        }
        return orders;
    }
    sort(customSort: Array): Function {
        throw new Error(`Unknown order operation !  ${customSort[0]}`);
    }
    read(query: Object, successCallBack: Function, errorCallback: Function): boolean {
        try {

            let criteria = new Criteria(this.__data);

            if (query) {
                // offset
                if (query.offset) {
                    criteria.setFirstResult(query.offset);
                }
                // limit
                if (query.limit) {
                    criteria.setMaxResults(query.limit);
                }
                // filters
                if (query.filters) {
                    criteria.addAll(LocalEndPoint.$filter(this, query.filters));
                }
                // orderings
                if (query.sort) {
                    criteria.addOrderAll(LocalEndPoint.$sort(this, query.sort));
                }
            }
            let result = {
                data: criteria.list(),
                totalCount: this.__data.length
            };
            if (successCallBack)
                successCallBack(result);

            return true;
        } catch (e) {
            let code: number;
            let message: string;
            code = e.code ? e.code : 500;
            message = e.message ? e.message : e;
            if (errorCallback)
                errorCallback(code, message);

            return false;
        }

    }
}
