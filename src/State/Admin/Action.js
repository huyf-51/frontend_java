import {
    ADD_USER,
    DELETE_USER,
    FAIL_REQUEST,
    GET_USER_LIST,
    MAKE_REQUEST,
    UPDATE_USER,
} from './ActionType';
import { API_BASE_URL, api } from '../../config/apiconfig';

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST,
    };
};
export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err,
    };
};
export const getUserList = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data,
    };
};
export const deleteUser = () => {
    return {
        type: DELETE_USER,
    };
};
export const addUser = () => {
    return {
        type: ADD_USER,
    };
};
export const updateUser = () => {
    return {
        type: UPDATE_USER,
    };
};

export const FetchUserList = (reqdata) => {
    const { pageNumber, pageSize } = reqdata;
    return (dispatch) => {
        dispatch(makeRequest());
        // setTimeout(() => {
        api.get(
            `/employee/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
        )
            .then((res) => {
                const userlist = res.data;
                dispatch(getUserList(userlist));
            })
            .catch((err) => {
                dispatch(failRequest(err.message));
            });
        // }, 200);
    };
};

export const Removeuser = (code) => {
    return async (dispatch) => {
        // dispatch(makeRequest());
        try {
            const res = await api.delete(`/employee/delete/` + code);
            // dispatch(deleteUser());
        } catch (err) {
            // dispatch(failRequest(err.message));
        }
    };
};

export const FunctionAddUser = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        //setTimeout(() => {
        api.post(`${API_BASE_URL}/auth/signup/employee`, data)
            .then((res) => {
                dispatch(addUser());
            })
            .catch((err) => {
                dispatch(failRequest(err.message));
            });
        // }, 2000);
    };
};
export const FunctionUpdateEmployee = (salary, id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        //setTimeout(() => {
        api.put(
            `${API_BASE_URL}/employee/update/salary/` +
                id +
                '?monthSalary=' +
                salary
        )
            .then((res) => {
                // dispatch(addUser());
                // toast.success('Point Added successfully.');
            })
            .catch((err) => {
                dispatch(failRequest(err.message));
            });
        // }, 2000);
    };
};
export const CreateSalaryAll = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        // setTimeout(() => {
        api.get(`/employee/create/salary/all`)
            .then((res) => {
                // const userlist = res.data;
                // console.log(userlist);
                // dispatch(geUserList(userlist));
            })
            .catch((err) => {
                dispatch(failRequest(err.message));
            });
        // }, 200);
    };
};
// export const FunctionUpdateUser = (data, code) => {
//   return (dispatch) => {
//     dispatch(makeRequest());
//     //setTimeout(() => {
//     axios
//       .put("http://localhost:8000/user/" + code, data)
//       .then((res) => {
//         dispatch(updateUser());
//         toast.success("User Updated successfully.");
//       })
//       .catch((err) => {
//         dispatch(failRequest(err.message));
//       });
//     // }, 2000);
//   };
// };
