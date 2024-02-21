"use server"

import { revalidatePath } from "next/cache";
import User from "../db/models/user.model"
import { dbConnect } from "../db/mongoose"
import { handleError } from "../utils";



// Create New User
export async function createUser(user: CreateUserParams){
    try {
        await dbConnect()

        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}


// Checking if user exists by Id
export async function getUserById(userId: string){
    try {

        await dbConnect()

        const user = await User.findOne({ clerkId: userId })

        return JSON.parse(JSON.stringify(user))
        
    } catch (error) {
        handleError(error)
    }
}



export async function updateUser( clerkId: string, user: UpdateUserParams ){
    try {
        await dbConnect()

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

        return JSON.parse(JSON.stringify(updatedUser))

    } catch (error) {
        handleError(error)
    }
}  


export async function deleteUser( clerkId: string ){
    try {
        await dbConnect();

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId });
    
        if (!userToDelete) {
          throw new Error("User not found");
        }
    
        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");
    
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error)
    }
} 


export async function updateCredits(userId: string, creditFee: number) {
    try {
      await dbConnect();
  
      const updatedUserCredits = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { creditBalance: creditFee }},
        { new: true }
      )
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }