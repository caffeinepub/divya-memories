import Text "mo:core/Text";

actor {
  let correctPassword = "53";

  public query func verifyPassword(password : Text) : async Bool {
    password == correctPassword;
  };
};
