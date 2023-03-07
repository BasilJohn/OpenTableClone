interface Props {
    inputs: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        city: string,
        password: string
    };
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSignIn: boolean
}

export default function AuthModalnputs({ inputs, handleChangeInput, isSignIn }: Props) {
    return (
        <div>
            {!isSignIn && <div className="my-3 flex justify-between text-sm">
                <input className="input border rounded 
                p-2 py-3 w-[49%] bg-white text-black"
                    placeholder="First Name"
                    value={inputs.firstName}
                    name="firstName"
                    onChange={handleChangeInput}>

                </input>
                <input className="input border rounded 
                p-2 py-3 w-[49%] bg-white text-black"
                    placeholder="Last Name"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChangeInput}>
                </input>
            </div>}
            <div className="my-3 flex justify-between text-sm">
                <input className="input border rounded 
                p-2 py-3 w-full bg-white text-black"
                    placeholder="Email"
                    value={inputs.email}
                    name="email"
                    type="email"
                    onChange={handleChangeInput}>
                </input>
            </div>
            {!isSignIn && <div className="my-3 flex justify-between text-sm">
                <input className="input border rounded 
                p-2 py-3 w-[49%] bg-white text-black"
                    placeholder="Phone"
                    value={inputs.phone}
                    name="phone"
                    onChange={handleChangeInput}>
                </input>
                <input className="input border rounded 
                p-2 py-3 w-[49%] bg-white text-black"
                    placeholder="City"
                    value={inputs.city}
                    name="city"
                    onChange={handleChangeInput}>
                </input>
            </div>}
            <div className="my-3 flex justify-between text-sm">
                <input className="input border rounded 
                p-2 py-3 w-full bg-white text-black"
                    placeholder="Password"
                    value={inputs.password}
                    type="password"
                    name="password"
                    onChange={handleChangeInput}>
                </input>
            </div>
        </div>
    )
}
