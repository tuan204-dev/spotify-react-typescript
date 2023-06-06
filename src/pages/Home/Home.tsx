import Header from "@/components/Header/Header"


interface HomeProps {
  children?: React.ReactNode
}

const Home: React.FC<HomeProps> = (props) => {

  const {children} = props

  return (
    <div >
      <Header/>
    </div>
  )
}

export default Home
