export default interface Page {
  processId: number;
  pageNumber: number;
  location: "disk" | "ram";
}
