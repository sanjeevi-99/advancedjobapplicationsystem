/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from '../../utilities/CustomBootstrap';
import {
    FormikReactSelect
} from '../../utilities/FormikFields';
import toast from 'react-hot-toast';

const ApplicationForm = () => {
    const location = useLocation();
    const props = location.state;

    console.log("data", props);

    const SignupSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required!'),
        lastname: Yup.string().required('Last Name is required!'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        skills: Yup.array()
            .min(3, 'Choose at least 3 skills')
            .of(
                Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required(),
                })
            )
    });

    const options = props.skills ? props.skills : [
        { value: 'food', label: 'Food' },
        { value: 'beingfabulous', label: 'Being Fabulous', disabled: true },
        { value: 'reasonml', label: 'ReasonML' },
        { value: 'unicorns', label: 'Unicorns' },
        { value: 'kittens', label: 'Kittens' },
    ];

    const onSubmit = (values, { setSubmitting }) => {
        const payload = {
            ...values,
            skills: values.skills.map((t) => t.value),
        };

        let newJob = {};
        let prevJob = JSON.parse(localStorage.getItem('jobs'));
        console.log("111110", prevJob);


        let searchedJob = prevJob?.find((data) => data.id == props.id);
        if (!searchedJob) {
            if (!prevJob) {
                props['user_data'] = payload;
                newJob = [props];
                console.log("2222", newJob);

                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            } else {
                props['user_data'] = payload;
                newJob = [...prevJob, props];
                console.log("33333333", newJob);
                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            }
        } else {
            console.log('1111111111111111111');

            toast.error('Already applied');
        }


        setTimeout(() => {
            console.log(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
    };

    return (
        <>
            <Row className="mb-4">
                <Colxx xxs="12" lg="3">
                </Colxx>
                <Colxx xxs="12" lg="6">
                    <Card style={{ borderRadius: '1.5rem' }}>
                        <CardBody>
                            <h1 className='text-5xl text-center bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent p-2 mb-8'>{props.company_name} - {props.job_title}</h1>
                            <Formik
                                initialValues={{
                                    firstname: '',
                                    lastname: '',
                                    email: '',
                                    skills: [],
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={onSubmit}
                            >
                                {({
                                    handleSubmit,
                                    setFieldValue,
                                    setFieldTouched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    errors,
                                    touched,
                                    isSubmitting,
                                }) => (
                                    <Form className="av-tooltip tooltip-label-right">
                                        <FormGroup className="error-l-100">
                                            <Label>
                                                First Name
                                            </Label>
                                            <Field className="form-control" name="firstname" />
                                            {errors.firstname && touched.firstname ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.firstname}
                                                </div>
                                            ) : null}
                                        </FormGroup>   <FormGroup className="error-l-100">
                                            <Label>
                                                Last Name
                                            </Label>
                                            <Field className="form-control" name="lastname" />
                                            {errors.lastname && touched.lastname ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.lastname}
                                                </div>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="error-l-100">
                                            <Label>
                                                Email
                                            </Label>
                                            <Field className="form-control" name="email" />
                                            {errors.email && touched.email ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.email}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Skills </Label>
                                            <FormikReactSelect
                                                name="skills"
                                                id="skills"
                                                value={values.skills}
                                                isMulti
                                                options={options}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                            {errors.skills && touched.skills ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.skills}
                                                </div>
                                            ) : null}
                                        </FormGroup>

                                        <Button color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Colxx>
                <Colxx xxs="12" lg="3">
                </Colxx>
            </Row>
        </>
    );
};
export default ApplicationForm;




